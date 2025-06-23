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
import { useNavigate } from "react-router-dom";
import { UsersFilter } from "../../../components/common/UsersFilter/UsersFilter";

export const AdminUsers = () => {
    const { setBreadcrumbItems } = useBreadcrumbs();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState<ProfileShortDto[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        filterLastName: ''
    });

    useEffect(() => {
        setBreadcrumbItems([
            {id: 'main', label: "Главная", path: "/events"},
            { id: 'admin', label: 'Администрирование', path: '/admin' },
            { id: 'users', label: 'Пользователи', path: '/admin/users' }
        ]);
    }, [setBreadcrumbItems]);

    const fetchUsers = async (page: number = 1) => {
        setIsLoading(true);
        try {
            const response = await getUsersForAdmin( filters.email, filters.name, filters.filterLastName, page, 9);
            const usersResponse: AdminUsersResponse = response.data;
            setUsers(usersResponse.results);
            setPagination(usersResponse.metaData);
        } catch (error) {
            showNotification(dispatch, "Ошибка при загрузке пользователей", NotificationTypeEnum.ERROR)
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = (filters: { name: string; email: string; filterLastName: string }) => {
        setFilters(filters);
    }

    useEffect(() => {
        fetchUsers();
    }, [filters]);

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
                <UsersFilter onSearch={handleSearch} isLoading={isLoading} />
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
