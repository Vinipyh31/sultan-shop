import { useState } from 'react';
import { ICheckbox } from '../../../types';
import cl from './Checkbox.module.scss'

interface Props {
    checkboxes: ICheckbox[];
    checkedValues: string[];
    setCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
}

const Checkbox = ({ checkboxes, checkedValues, setCheckboxes }: Props) => {
    const [showAll, setShowAll] = useState(false);
    const visibleCheckboxes = showAll ? checkboxes : checkboxes.slice(0, 4);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const isChecked = event.target.checked;

        const updatedCheckboxes = checkedValues.filter(cb => cb !== value);

        if (isChecked) {
            const selectedCheckbox = checkboxes.find(cb => cb.value === value);
            selectedCheckbox && updatedCheckboxes.push(selectedCheckbox.value);
        }

        
        
        setCheckboxes(updatedCheckboxes);
    };

    return (
        <div className={cl.checkboxList}>
            {visibleCheckboxes.map((checkbox) => (
                <label key={checkbox.value} className="checkbox__label">
                    <input
                        type="checkbox"
                        value={checkbox.value}
                        checked={checkedValues.some(cb => cb === checkbox.value)}
                        onChange={handleChange}
                    />
                    {checkbox.label}
                </label>
            ))}
            {checkboxes.length > 4 && (
                <button className="checkbox__button" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Скрыть' : 'Показать все'}
                </button>
            )}
        </div>
    );
};

export default Checkbox;
