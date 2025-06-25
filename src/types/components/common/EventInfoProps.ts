import { EventFullDto } from "../../api/eventsTypes"

export type AdminEventInfoProps = {
    event: EventFullDto,
    onEdit: () => void
}