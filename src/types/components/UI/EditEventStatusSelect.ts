import { EventStatus } from "../../api/eventsTypes"

export type EditEventStatusSelectProps = {
    status: EventStatus,
    onChange: (status: EventStatus) => void 
}