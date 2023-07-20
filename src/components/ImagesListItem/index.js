import './index.css'

const ImagesListItem = prop => {
  const {imageDetails} = prop
  const {previewPhotos} = imageDetails
  return (
    <li className="image-list-item">
      {previewPhotos.map(each => {
        const {urls, id} = each
        return (
          <div className="image-container">
            <img src={urls.thumb} className="image" key={id} alt="thumbnail" />
            <div className="popup">This is a popup</div>
          </div>
        )
      })}
    </li>
  )
}

export default ImagesListItem
