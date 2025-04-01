import { Button } from "../../components/UI/Button/Button";
import { FilterChip } from "../../components/UI/FilterChip/FilterChip";
import CheckIcon from '../../assets/icons/Interface/red/Check.svg?react';
import ArrowIcon from '../../assets/icons/Arrow/red/Caret_Down_MD.svg?react';
import { Input } from "../../components/UI/Input/Input";

export const Login = () => {
    return (
        <div>
            <Button onClick={() => console.log('Login')} variant="outline">ВОЙТИ</Button>
            <FilterChip 
            onClick={() => console.log('Filter chip')} 
            variant="outline" 
            leftIcon={<CheckIcon></CheckIcon>}
            rightIcon={<ArrowIcon></ArrowIcon>}>
                Label</FilterChip>
            <Input label="test"></Input>
        </div>
    );
}