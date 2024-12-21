import React from "react";
const Form = () => {
    const [gender, setGender] = React.useState('default');
  
   const handleChange = (event) => {
      setGender(event.target.value)
    }
  
    const resetRadioState = () => {
      setGender('');
    }
    return (
      <form>
        <p>Gender</p>
        <div>
          <input
            type="radio"
            value="default"
            checked={gender === 'default'}
            onChange={handleChange}
          /> Male
        </div>
        <div>
          <input
            type="radio"
            value="new"
            checked={gender === 'new'}
            onChange={handleChange}
          /> Female
        </div>

        <div>

        </div>
      </form>
    )
  }
  export default Form