import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UsersFilterForm, UsersFilterProps } from "../../../types/components/common/AdminUsersProps";
import styles from './UsersFilter.module.css';
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import { useIntl } from "react-intl";
import { LetterPicker } from "../../UI/LetterPicker/LetterPicker";

export const UsersFilter = ({ onSearch, isLoading = false }: UsersFilterProps) => {
    const intl = useIntl();
    const methods = useForm<UsersFilterForm>({
        defaultValues: {
            name: '',
            email: '',
            filterLastName: ''
        }
    })
    const letters = ['А', 'Б', 'В',
        'Г', 'Д', 'Е', 'Ё', 'Ж', 
        'З', 'И', 'Й', 'К', 'Л',
        'М', 'Н', 'О', 'П', 'Р',
        'С', 'Т', 'У', 'Ф', 'Х',
        'Ц', 'Ч', 'Ш', 'Щ',
         'Э', 'Ю', 'Я'];

    const { register, handleSubmit, setValue } = methods;

    const onSubmit: SubmitHandler<UsersFilterForm> = (data: UsersFilterForm) => {
        onSearch({
            name: data.name,
            email: data.email,
            filterLastName: data.filterLastName
        });
    };

    const handleLetterClick = (letter: string) => {
        setValue('filterLastName', letter);
        handleSubmit(onSubmit)();
    };

    return (
        <div className={styles.usersFilter}>
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.nameSearch}>
                        <Input
                            type="text"
                            placeholder={intl.formatMessage({ id: 'nameLabel' })}
                            {...register("name")}
                        />
                        <Button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? "searching" : "searchButton" }
                        </Button>
                    </div>
                    <LetterPicker letters={letters} onLetterClick={handleLetterClick} />
                </form>
            </FormProvider>
        </div>
    )
}