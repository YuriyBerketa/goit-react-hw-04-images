
import './Modal.css';
import { createPortal } from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const ModalRoot = document.querySelector('#ModalRoot');

export function Modal ({onClose, image}) {

  useEffect(() => {
    const keyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    }
  }, [onClose]);
  
  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }
const { largeImageURL } = image;

return createPortal(
      <div onClick={onOverlayClose} className="Overlay">
        <div className="Modal">
          <img src={largeImageURL} alt="img" />
        </div>
      </div>,
      ModalRoot
    );

}

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.keyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.keyDown);
//   }

//   keyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   onOverlayClose = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImageURL } = this.props.image;
//     return createPortal(
//       <div onClick={this.onOverlayClose} className="Overlay">
//         <div className="Modal">
//           <img src={largeImageURL} alt="img" />
//         </div>
//       </div>,
//       ModalRoot
//     );
//   }
// }


Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
}