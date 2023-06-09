
import React from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { fetchImages } from './fetchAPI/fetchAPI';
import { Searchbar } from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import { Loader } from './Loader/Loader';
import { useState } from 'react';

let page = 1;




export function App () {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  
  
  
 
  const handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      Notiflix.Notify.info('Я не знаю, що шукати:(');
      return;
    } else {
      try {
        setStatus('pending' );
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Вибачте, але за вашим запитом нічого не знайдено'
          );
        } else {
          setItems(hits);
          setInputData(inputData);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
  };
 const onNextPage = async () => {
    setStatus('pending');

    try {
      const { hits } = await fetchImages(inputData, (page += 1));
      setItems(prevState => [...prevState, ...hits]);
      setStatus('resolved');
      
    } catch (error) {
      setStatus('rejected')
    }
  };
  
    
    if (status === 'idle') {
      return (
        <div className="App">
          <Searchbar onSubmit={handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="App">
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className="App">
          <Searchbar onSubmit={handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={onNextPage} />
          )}
        </div>
      );
    }
    
  
    
}




// export class App extends Component {
//   state = {
//     inputData: '',
//     items: [],

//     status: 'idle',
//     totalHits: 0,
//   };

//   handleSubmit = async inputData => {
//     page = 1;
//     if (inputData.trim() === '') {
//       Notiflix.Notify.info('Я не знаю, що шукати:(');
//       return;
//     } else {
//       try {
//         this.setState({ status: 'pending' });
//         const { totalHits, hits } = await fetchImages(inputData, page);
//         if (hits.length < 1) {
//           this.setState({ status: 'idle' });
//           Notiflix.Notify.failure(
//             'Вибачте, але за вашим запитом нічого не знайдено'
//           );
//         } else {
//           this.setState({
//             items: hits,
//             inputData,
//             totalHits: totalHits,
//             status: 'resolved',
//           });
//         }
//       } catch (error) {
//         this.setState({ status: 'rejected' });
//       }
//     }
//   };
//   onNextPage = async () => {
//     this.setState({ status: 'pending' });

//     try {
//       const { hits } = await fetchImages(this.state.inputData, (page += 1));
//       this.setState(prevState => ({
//         items: [...prevState.items, ...hits],
//         status: 'resolved',
//       }));
//     } catch (error) {
//       this.setState({ status: 'rejected' });
//     }
//   };
//   render() {
//     const { totalHits, status, items } = this.state;
//     if (status === 'idle') {
//       return (
//         <div className="App">
//           <Searchbar onSubmit={this.handleSubmit} />
//         </div>
//       );
//     }
//     if (status === 'pending') {
//       return (
//         <div className="App">
//           <Searchbar onSubmit={this.handleSubmit} />
//           <ImageGallery page={page} items={this.state.items} />
//           <Loader />
//           {totalHits > 12 && <Button onClick={this.onNextPage} />}
//         </div>
//       );
//     }
//     if (status === 'rejected') {
//       return (
//         <div className="App">
//           <Searchbar onSubmit={this.handleSubmit} />
//           <p>Something wrong, try later</p>
//         </div>
//       );
//     }
//     if (status === 'resolved') {
//       return (
//         <div className="App">
//           <Searchbar onSubmit={this.handleSubmit} />
//           <ImageGallery page={page} items={this.state.items} />
//           {totalHits > 12 && totalHits > items.length && (
//             <Button onClick={this.onNextPage} />
//           )}
//         </div>
//       );
//     }
    
//   }
    
// }
