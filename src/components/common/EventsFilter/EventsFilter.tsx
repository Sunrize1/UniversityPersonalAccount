import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '../../UI/Button/Button';
import { DatePicker } from '../../UI/DatePicker/DatePicker';
import { Input } from '../../UI/Input/Input';
import styles from './EventsFilter.module.css';
import { EventsFilterForm, EventsFilterProps } from '../../../types/components/common/EventTypes';
import { useEffect } from 'react';

export const EventsFilter = ({ onSearch, isLoading = false, filterValues }: EventsFilterProps) => {
    const methods = useForm<EventsFilterForm>({
        defaultValues: {
            name: '',
            date: '',
        },
    });

    const { register, handleSubmit, setValue } = methods;

    useEffect(() => {
        if (filterValues) {
            setValue('name', filterValues.name || '');
            setValue('date', filterValues.date || '');
        }
    }, [filterValues, setValue]);

    const onSubmit: SubmitHandler<EventsFilterForm> = (data: EventsFilterForm) => {
        onSearch({
            name: data.name,
            eventDate: data.date
        });
    };

    const handleDateChange = (date: Date | null) => {
        const dateString = date ? date.toISOString().split('T')[0] : '';
        setValue('date', dateString);
    };

    return (
        <div className={styles.eventsFilter}>
            <h3 className={styles.title}>
                <FormattedMessage id="eventsSearch" />
            </h3>
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.nameSearch}>
                        <Input 
                            type="text" 
                            label="eventNameLabel" 
                            {...register("name")} 
                        />
                        <Button className={styles.searchButton} type="submit" disabled={isLoading}>
                           {isLoading ? "searching" : "searchButton" }
                        </Button>
                    </div>
                    <DatePicker 
                        label="eventDateLabel" 
                        placeholder={'eventDatePlaceholder'} 
                        onChange={handleDateChange}
                        className={styles.datePicker}
                    />
                </form>
            </FormProvider>
        </div>
    );
};