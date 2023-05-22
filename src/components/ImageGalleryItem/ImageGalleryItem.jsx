import './ImageGalleryItem.css';
import { Modal } from 'components/Modal/Modal';
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';



export function ImageGalleryItem({item}) {

  const [shownModal, setShownModal] = useState(false);

  const onModal = () => {
    setShownModal(prevState => !prevState );
  };
  const { webformatURL } = item;

  return (
      <li className="ImageGalleryItem">
        <img
          onClick={onModal}
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt="img"
        />
        {shownModal && <Modal onClose={onModal} image={item} />}
      </li>
    );
}


// export class ImageGalleryItem extends Component {
//   state = {
//     shownModal: false,
//   };
//   onModal = () => {
//     this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
//   };
//   render() {
//     const { item } = this.props;
//     const { webformatURL } = item;
//     return (
//       <li className="ImageGalleryItem">
//         <img
//           onClick={this.onModal}
//           className="ImageGalleryItem-image"
//           src={webformatURL}
//           alt="img"
//         />
//         {this.state.shownModal && <Modal onClose={this.onModal} image={item} />}
//       </li>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};


