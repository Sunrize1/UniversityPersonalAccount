import { Button } from "../../components/UI/Button/Button";
import { FilterChip } from "../../components/UI/FilterChip/FilterChip";
import CheckIcon from '../../assets/icons/Interface/red/Check.svg?react';
import ArrowIcon from '../../assets/icons/Arrow/red/Caret_Down_MD.svg?react';
import { Input } from "../../components/UI/Input/Input";
import { Switch } from "../../components/UI/Switch/Switch";
import { RadioButton } from "../../components/UI/RadioButton/RadioButton";
import { useState } from "react";

export const Login = () => {
    const [selectedValue, setSelectedValue] = useState<string>('option1');

    const handleChange = (value: string) => {
        setSelectedValue(value);
        console.log('Selected:', value);
    };

    return (
        <div>
            <Button onClick={() => console.log('Login')} variant="primary">ВОЙТИ</Button>
            <FilterChip 
            onClick={() => console.log('Filter chip')} 
            variant="outline" 
            leftIcon={<CheckIcon></CheckIcon>}
            rightIcon={<ArrowIcon></ArrowIcon>}>
                Label</FilterChip>
            <Input label="test"></Input>
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
        </div>
    );
}