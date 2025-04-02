import { Button } from "../../components/UI/Button/Button";
import { FilterChip } from "../../components/UI/FilterChip/FilterChip";
import CheckIcon from '../../assets/icons/Interface/red/Check.svg?react';
import ArrowIcon from '../../assets/icons/Arrow/red/Caret_Down_MD.svg?react';
import { Input } from "../../components/UI/Input/Input";
import { Switch } from "../../components/UI/Switch/Switch";
import { RadioButton } from "../../components/UI/RadioButton/RadioButton";
import { useState } from "react";
import { Checkbox } from "../../components/UI/Checkbox/Checkbox";
import { FormProvider, useForm } from "react-hook-form";

export const Login = () => {
    const [selectedValue, setSelectedValue] = useState<string>('option1');
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(true);

    const methods = useForm({
        defaultValues: {
          username: "",
        },
        mode: "onChange",
      });
      
    const onSubmit = (data: any) => {
        console.log(data);
    };

    const { register } = methods;

    const handleChange = (value: string) => {
        setSelectedValue(value);
        console.log('Selected:', value);
    };

    return (
        <div>
            <FilterChip 
            onClick={() => console.log('Filter chip')} 
            variant="outline" 
            leftIcon={<CheckIcon/>}
            rightIcon={<ArrowIcon/>}>
                Label</FilterChip>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input
                    label="Username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
                            }
                        })}
                    />
                    <Button type="submit" variant="primary">Submit</Button>
                </form>
            </FormProvider>
            <Switch selected={true} onChange={(selected) => console.log(selected)}></Switch>
            <div style={{ display: 'flex', gap: '20px' }}>
            <RadioButton
                name="group1"
                value="option1"
                selected={selectedValue === 'option1'}
                onChange={handleChange}
            />
            <RadioButton
                name="group1"
                value="option2"
                selected={selectedValue === 'option2'}
                onChange={handleChange}
                disabled
            />
            <RadioButton
                name="group1"
                value="option3"
                selected={selectedValue === 'option3'}
                onChange={handleChange}
            />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Checkbox selected={checked1} onChange={setChecked1} />
                <Checkbox selected={checked2} onChange={setChecked2} disabled />
                <Checkbox selected={checked3} onChange={setChecked3}/>
            </div>
        </div>
    );
}
