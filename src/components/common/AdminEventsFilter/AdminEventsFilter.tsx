import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '../../UI/Button/Button';
import { DatePicker } from '../../UI/DatePicker/DatePicker';
import { Input } from '../../UI/Input/Input';
import { Select } from '../../UI/Select/Select';
import styles from './AdminEventsFilter.module.css';
import FiltersIcon from '../../../assets/icons/Edit/red/Slider.svg?react'
import { EventStatus, EventFormat, EventType, EventAuditory } from '../../../types/api/eventsTypes';
import { AdminEventsFilterForm, AdminEventsFilterProps } from '../../../types/components/common/AdminEventsProps';
import { FilterChip } from '../../UI/FilterChip/FilterChip';
import { useState, useEffect } from 'react';

export const AdminEventsFilter = ({ onSearch, isLoading = false, filterValues }: AdminEventsFilterProps) => {
  const methods = useForm<AdminEventsFilterForm>({
    defaultValues: {
      name: null,
      status: null,
      format: null,
      type: null,
      eventDate: null, 
      timezoneOffset: null,
    },
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const { register, handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (filterValues) {
      setValue('name', filterValues.name ?? null);
      setValue('status', filterValues.status ?? null);
      setValue('format', filterValues.format ?? null);
      setValue('type', filterValues.type ?? null);
      setValue('eventDate', filterValues.eventDate ?? null);
      setValue('timezoneOffset', filterValues.timezoneOffset ?? null);
      if (
        filterValues.status ||
        filterValues.format ||
        filterValues.type ||
        filterValues.eventDate ||
        filterValues.timezoneOffset
      ) {
        setIsFiltersOpen(true);
      }
    }
  }, [filterValues, setValue]);

  const onSubmit: SubmitHandler<AdminEventsFilterForm> = (data: AdminEventsFilterForm) => {
    onSearch({
      name: data.name,
      eventDate: data.eventDate,
      status: data.status,
      format: data.format,
      type: data.type,
      timezoneOffset: data.timezoneOffset,
    });
  };

  const handleDateChange = (date: Date | null) => {
    const dateString = date ? date.toISOString().split('T')[0] : '';
    setValue('eventDate', dateString);
  };

  const handleReset = () => {
    reset();
    onSearch({
      name: null,
      status: null,
      format: null,
      type: null,
      eventDate: null, 
      timezoneOffset: null,
    });

    setIsFiltersOpen(!isFiltersOpen)
  };


  const statusOptions = [
    { value: '', label:'allStatuses' },
    { value: EventStatus.Draft, label: 'eventStatusDraft'  },
    { value: EventStatus.Actual, label: 'eventStatusActual'  },
    { value: EventStatus.Finished, label: 'eventStatusFinished' },
    { value: EventStatus.Archive, label: 'eventStatusArchive'  },
  ];

  const formatOptions = [
    { value: '', label: 'allFormats' },
    { value: EventFormat.Online, label: 'eventFormatOnline' },
    { value: EventFormat.Offline, label: 'eventFormatOffline'  },
  ];

  const typeOptions = [
    { value: '', label: 'allTypes' },
    { value: EventType.Open, label: 'eventTypeOpen'},
    { value: EventType.Close, label:'eventTypeClose'  },
  ];


  return (
    <div className={styles.adminEventsFilter}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.title}>
          <FormattedMessage id="adminEventsSearch" />
        </h3>
        <FilterChip 
          variant='outline'
          onClick={handleReset}
          className={styles.filtersButton}
          rightIcon={<FiltersIcon/>}
        >
          filters
        </FilterChip>
      </div>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.mainFilters}>
            <div className={styles.nameSearch}>
              <Input 
                type="text" 
                label="eventNameLabel" 
                {...register("name")} 
              />
              <Button className={styles.searchButton} type="submit" disabled={isLoading}>
                {isLoading ? "searching" : "searchButton"}
              </Button>
            </div>
          </div>

        {isFiltersOpen && (
                    <div className={styles.additionalFilters}>
                    <div className={styles.filterCol}>
                      <Select
                        label="eventStatusLabel"
                        options={statusOptions}
                        placeholder={'allStatuses'}
                        {...register("status")}
                      />
                      <Select
                        label="eventFormatLabel"
                        options={formatOptions}
                        placeholder={'allFormats'}
                        {...register("format")}
                      />
                    </div>
                    <div className={styles.filterCol}>
                      <Select
                        label="eventTypeLabel"
                        options={typeOptions}
                        placeholder={'allTypes'}
                        {...register("type")}
                      />
                      <DatePicker 
                        label="eventDateLabel" 
                        placeholder={'eventDatePlaceholder'} 
                        onChange={handleDateChange}
                        className={styles.datePicker}/>
                    </div>
                  </div>
        )}
        </form>
      </FormProvider>
    </div>
  );
}; 