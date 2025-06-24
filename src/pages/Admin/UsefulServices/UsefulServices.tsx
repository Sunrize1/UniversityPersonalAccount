import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../../components/common/Breadcrumbs/Breadcrumbs"
import { UsefulServicesCardsList } from "../../../components/common/UsefulServicesCardsList/UsefulServicesCardsList"
import { Container } from "../../../components/UI/Container/Container"
import { useAppDispatch } from "../../../store/hooks";
import { useBreadcrumbs } from "../../../hooks/useBreadcrumbs";
import { Pagination, UsefulService } from "../../../types/api/UsefulServicesResponse";
import { getUsefulServices } from "../../../api/requests/getUsefulServices";
import { showNotification } from "../../../utils/notification";
import { NotificationTypeEnum } from "../../../types/redux/NotificationTypeEnum";
import { FormattedMessage } from "react-intl";
import PlusIcon from '../../../assets/icons/Edit/red/Add_Plus.svg?react'
import { FilterChip } from "../../../components/UI/FilterChip/FilterChip";
import { UsefulServiceModal } from "../../../components/common/UsefulServiceModal/UsefulServiceModal";
import { EditCreateUsefulServiceRequest } from "../../../types/api/CreateUsefulServiceRequest";
import { FileDto } from "../../../types/api/certificateTypes";
import styles from "./UsefulServices.module.css"

export const UsefulServices = () => {
    const dispatch = useAppDispatch();
    const { setBreadcrumbItems } = useBreadcrumbs();
    const [links, setLinks] = useState<UsefulService[]>([]);
    const [pagination, setPagination] = useState<Pagination | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<EditCreateUsefulServiceRequest | null>(null);
    const [editingServiceId, setEditingServiceId] = useState<string | undefined>(undefined);
    const [editingServiceImage, setEditingServiceImage] = useState<FileDto | null>(null);

    useEffect(() => {
        setBreadcrumbItems([
            {id: 'main', label: "Главная", path: "/events"},
            { id: 'admin', label: 'Администрирование', path: '/admin' },
             { id: 'usefulservices', label: 'Полезные сервисы', path: '/admin/usefulservices' }
        ]);
    }, [setBreadcrumbItems]);
    
    const fetchLinks = async (page: number = 1) => {
        setIsLoading(true);
        try {
            const response = await getUsefulServices( page, 10);
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
        fetchLinks(page);
    };

    const handleOpenModal = () => {
        setEditingService(null);
        setEditingServiceId(undefined);
        setEditingServiceImage(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
        setEditingServiceId(undefined);
        setEditingServiceImage(null);
    };

    const handleServiceCreatedOrUpdated = () => {
        setIsModalOpen(false);
        setEditingService(null);
        setEditingServiceId(undefined);
        setEditingServiceImage(null);
        fetchLinks(currentPage);
    };

    const handleServiceDeleted = () => {
        fetchLinks(currentPage);
    }

    const handleEditService = (service: UsefulService) => {
        const serviceData: EditCreateUsefulServiceRequest = {
            title: service.title,
            category: service.category,
            description: service.description,
            link: service.link,
            termsOfDisctribution: service.termsOfDisctribution,
            logoId: service.logo?.id || ''
        };
        
        setEditingService(serviceData);
        setEditingServiceId(service.id);
        setEditingServiceImage(service.logo);
        setIsModalOpen(true);
    }

    useEffect(() => {
        fetchLinks(currentPage);
    }, [currentPage]);

    return (
        <Container>
            <div className={styles.content}>
                <Breadcrumbs/>
                <h2><FormattedMessage id="/usefulservices"></FormattedMessage></h2>
                <FilterChip variant="outline" rightIcon={<PlusIcon/>} onClick={handleOpenModal}>addService</FilterChip>
                <UsefulServicesCardsList
                    links={links}
                    isLoading={isLoading}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onAction={handleServiceDeleted}
                    onEdit={handleEditService}
                />
            </div>
            
            <UsefulServiceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onServciceCreated={handleServiceCreatedOrUpdated}
                serviceData={editingService}
                image={editingServiceImage}
                serviceId={editingServiceId}
            />
        </Container>
    )
}