import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../components/common/Breadcrumbs/Breadcrumbs"
import { Container } from "../../components/UI/Container/Container"
import { LinksList } from "../../components/common/LinksList/LinkList"
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { getUsefulServices } from "../../api/requests/getUsefulServices";
import { UsefulService, UsefulServiceCategory, Pagination } from "../../types/api/UsefulServicesResponse";
import styles from "./Links.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UserType } from "../../types/api/profileResponse";
import { showNotification } from "../../utils/notification";
import { NotificationTypeEnum } from "../../types/redux/NotificationTypeEnum";

export const Links = () => {
    const dispatch = useAppDispatch();
    const { setBreadcrumbItems } = useBreadcrumbs();
    const user = useAppSelector((state) => state.user.user);
    const userRoles = user?.userTypes || [];
    const hasStudentRole = userRoles.includes(UserType.Student);
    const hasEmployeeRole = userRoles.includes(UserType.Employee);
    const selectedCategory = hasStudentRole ? UsefulServiceCategory.Students : hasEmployeeRole ? UsefulServiceCategory.Employees : UsefulServiceCategory.ForAll;
    const [links, setLinks] = useState<UsefulService[]>([]);
    const [pagination, setPagination] = useState<Pagination | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
                setBreadcrumbItems([
            {
                id: "home",
                label: "Главная",
                path: "/"
            },
            {
                id: "links",
                label: "Полезные сервисы",
                path: "/links"
            }
        ]);
      }, [setBreadcrumbItems]);

    const fetchLinks = async (page: number = 1, category: UsefulServiceCategory = UsefulServiceCategory.ForAll) => {
        setIsLoading(true);
        try {
            const response = await getUsefulServices(category, page, 10);
            setLinks(response.data.results);
            setPagination(response.data.metaData);
        } catch (error) {
            showNotification(dispatch, "Ошибка при загрузке полезных сервисов", NotificationTypeEnum.ERROR, 5000);
            setLinks([]);
            setPagination(undefined);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchLinks(page, selectedCategory);
    };

    const handleLinkClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    useEffect(() => {
        fetchLinks(currentPage, selectedCategory);
    }, [currentPage, selectedCategory]);

    return (
        <Container>
            <Breadcrumbs />
            <div className={styles.content}>
                <LinksList 
                    links={links}
                    pagination={pagination}
                    isLoading={isLoading}
                    onPageChange={handlePageChange}
                    onLinkClick={handleLinkClick}
                />
            </div>
        </Container>
    )
}