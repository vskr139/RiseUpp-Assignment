import ImagesListItem from '../ImagesListItem'

import './index.css'

const ImagesDisplayContainer = prop => {
  const {imagesList} = prop
  return (
    <ul className="images-list-container">
      {imagesList.map(each => (
        <ImagesListItem key={each.id} imageDetails={each} />
      ))}
    </ul>
  )
}

export default ImagesDisplayContainer
