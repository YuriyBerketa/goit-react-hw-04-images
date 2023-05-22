import './Searchbar.css';
import React from 'react';
import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';
import { useState } from 'react';


export function Searchbar({onSubmit}) {
  
  const [inputData, setInputData] = useState('');

const onChangeInput = e => {
    setInputData( e.currentTarget.value.toLowerCase());
  };  
  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(inputData);

    setInputData('');
  };

 return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <ImSearch size={25} />
          </button>

          <input
            className="SearchForm-input"
            name="inputData"
            value={inputData}
            onChange={onChangeInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}
// export class Searchbar extends Component {
//   state = {
//     inputData: '',
//   };
//   onChangeInput = e => {
//     this.setState({ inputData: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.inputData);
//     this.setState({ inputData: '' });
//   };

//   render() {
//     const { inputData } = this.state.inputData;
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <ImSearch size={25} />
//           </button>

//           <input
//             className="SearchForm-input"
//             name="inputData"
//             value={inputData}
//             onChange={this.onChangeInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }


Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

