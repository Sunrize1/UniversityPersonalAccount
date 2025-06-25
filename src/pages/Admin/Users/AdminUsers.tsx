import { useEffect, useState } from "react";
import { useBreadcrumbs } from "../../../hooks/useBreadcrumbs";
import { AdminUsersResponse, ProfileShortDto } from "../../../types/api/AdminUsersResponse";
import { Pagination } from "../../../types/api/UsefulServicesResponse";
import { getUsersForAdmin } from "../../../api/requests/getUsersForAdmin";
import { showNotification } from "../../../utils/notification";
import { NotificationTypeEnum } from "../../../types/redux/NotificationTypeEnum";
import { useAppDispatch } from "../../../store/hooks";
import { Container } from "../../../components/UI/Container/Container";
import styles from './AdminUsers.module.css';
import { Breadcrumbs } from "../../../components/common/Breadcrumbs/Breadcrumbs";
import { UsersList } from "../../../components/common/UsersList/UsersList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UsersFilter } from "../../../components/common/UsersFilter/UsersFilter";
import { useIntl } from "react-intl";

export const AdminUsers = () => {
    const { setBreadcrumbItems } = useBreadcrumbs();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState<ProfileShortDto[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const intl = useIntl();
    const getFiltersFromParams = () => ({
        name: searchParams.get('name') || '',
        email: searchParams.get('email') || '',
        filterLastName: searchParams.get('filterLastName') || ''
    });
    const [filters, setFilters] = useState(getFiltersFromParams());

    useEffect(() => {
        setBreadcrumbItems([
            {id: 'main', label: intl.formatMessage({id: 'main'}), path: "/events"},
            { id: 'admin', label: intl.formatMessage({id: '/admin'}), path: '/admin' },
            { id: 'users', label: intl.formatMessage({id: 'users'}), path: '/admin/users' }
        ]);
    }, [setBreadcrumbItems]);

    const fetchUsers = async (page: number = 1, urlFilters = filters) => {
        setIsLoading(true);
        try {
            const response = await getUsersForAdmin( urlFilters.email, urlFilters.name, urlFilters.filterLastName, page, 9);
            const usersResponse: AdminUsersResponse = response.data;
            setUsers(usersResponse.results);
            setPagination(usersResponse.metaData);
        } catch (error) {
            showNotification(dispatch, intl.formatMessage({ id: 'loadError' }), NotificationTypeEnum.ERROR)
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = (filters: { name: string; email: string; filterLastName: string }) => {
        setFilters(filters);
        const params: any = {};
        if (filters.name) params.name = filters.name;
        if (filters.email) params.email = filters.email;
        if (filters.filterLastName) params.filterLastName = filters.filterLastName;
        setSearchParams(params);
    }

    useEffect(() => {
        const urlFilters = getFiltersFromParams();
        setFilters(urlFilters);
        fetchUsers(1, urlFilters);
    }, [searchParams]);

    const handleUserClick = (user: ProfileShortDto) => {
        navigate(`/admin/users/${user.id}`);
      };
  
      const handlePageChange = (page: number) => {
        fetchUsers(page);
      };

    return (
        <Container>
            <div className={styles.content}>
                <Breadcrumbs />
                <UsersFilter onSearch={handleSearch} isLoading={isLoading} filterValues={filters} />
                <UsersList
                    users={users}
                    pagination={pagination || undefined}
                    onUserClick={handleUserClick}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                />
            </div>
        </Container>
    )
}
