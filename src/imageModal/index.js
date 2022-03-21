const ImageModal = ({ imageUrl, setModalOpen,isModalOpen }) => {
  const closeHandle = () =>{
    setModalOpen(false);
  }
  return (
    <div  style={{ display: isModalOpen ? 'block': 'none'}}>
      <span className="close" onClick={closeHandle}>&times;</span>
      <img src={imageUrl} alt="gallery-imag" />
    </div>
  );
};
export default ImageModal;
