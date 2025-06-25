import { useState } from "react";
import { EventStatus } from "../../../types/api/eventsTypes";
import { EditEventStatusSelectProps } from "../../../types/components/UI/EditEventStatusSelect";
import ArrowUp from '../../../assets/icons/Arrow/white/Caret_Up_MD.svg?react';
import ArrowDown from '../../../assets/icons/Arrow/white/Caret_Down_MD.svg?react';
import styles from './EditEventStatusSeletc.module.css';
import { useIntl } from "react-intl";

export const EditEventStatusSelect = ({status, onChange}: EditEventStatusSelectProps) => {
    const intl = useIntl()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const getStatusText = (status: EventStatus) => {
        switch (status) {
          case EventStatus.Draft:
            return intl.formatMessage({ id: 'eventStatusDraft' });
          case EventStatus.Actual:
            return intl.formatMessage({ id: 'eventStatusActual' });
          case EventStatus.Finished:
            return intl.formatMessage({ id: 'eventStatusFinished' });
          case EventStatus.Archive:
            return intl.formatMessage({ id: 'eventStatusArchive' });
          default:
            return status;
        }
      };

      const getStatusClass = (status: EventStatus) => {
        switch (status) {
          case EventStatus.Draft:
            return "default";
          case EventStatus.Actual:
            return "success-light";
          case EventStatus.Finished:
            return "success";
          case EventStatus.Archive:
            return "black";
          default:
            return 'default';
        }
      };

    return (
        <div className={styles.container}>
            <div className={[styles.badge, styles[getStatusClass(status)]].join(' ')} onClick={() => setIsOpen(!isOpen)}>
               <span className={styles.badgeText}>{getStatusText(status)}</span>
               {isOpen ? <ArrowUp/> : <ArrowDown/>}
            </div>
            {isOpen && (
                <div className={styles.select}>
                    {[EventStatus.Draft, EventStatus.Actual, EventStatus.Finished, EventStatus.Archive].map((option) => (
                        <div
                            key={option}
                            className={[styles.badge, styles[getStatusClass(option)]].join(' ')}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            <span className={styles.badgeText}>{getStatusText(option)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}