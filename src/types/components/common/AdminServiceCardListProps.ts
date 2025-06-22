export type AdminServiceCardListProps = {
    services: Service[];
}

export type Service = {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
}