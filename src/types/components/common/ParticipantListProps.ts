import { EventParticipantDto } from "../../api/eventsTypes"

export type ParticipantListProps = {
    participants: EventParticipantDto[],
}

export type InnerParticipantCardProps = {
    participant: EventParticipantDto
}

export type ExternalParticipantCardProps = {
    participant: EventParticipantDto
}