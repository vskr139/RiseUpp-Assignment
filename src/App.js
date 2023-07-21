import {Component} from 'react'

import {FiSearch} from 'react-icons/fi'

import TabItem from './components/TabItem'

import ImagesDisplayContainer from './components/ImagesDisplayContainer'

import './App.css'

const tabItemsList = [
  {
    id: 'mountain',
    tabName: 'Mountain',
  },
  {
    id: 'flowers',
    tabName: 'Flowers',
  },
  {
    id: 'beaches',
    tabName: 'Beaches',
  },
  {
    id: 'cities',
    tabName: 'Cities',
  },
]

class App extends Component {
  state = {
    imagesData: [],
    activeTabId: 'mountain',
    searchInput: '',
    activeState: 'Mountain',
    isLoading: false,
    pageNavigateLeft: false,
    pageNavigateRight: true,
    currentIndex: 0,
    dataSize: 2,
  }

  componentDidMount() {
    this.getImagesData()
  }

  getImagesData = async () => {
    const {activeState} = this.state
    this.setState(prevState => ({isLoading: !prevState.isLoading}))
    const apiUrl = `https://api.unsplash.com/search/collections/?query=${activeState}&client_id=gHnKY0t9jaQdZ1SOJHlP5X58hiEGCfSo47zAo229sCU`

    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const jsonData = await response.json()
    const photosCollectionsData = jsonData.results.map(eachCollection => ({
      id: eachCollection.id,
      title: eachCollection.title,
      previewPhotos: eachCollection.preview_photos,
      description: eachCollection.cover_photo.alt_description,
      height: eachCollection.cover_photo.height,
      likes: eachCollection.cover_photo.likes,
      name: eachCollection.cover_photo.user.name,
      location: eachCollection.cover_photo.user.location,
    }))
    this.setState(prevState => ({
      imagesData: photosCollectionsData,
      isLoading: !prevState.isLoading,
    }))
  }

  onChangingTabItem = id => {
    this.setState(
      {
        activeTabId: id,
        activeState: id.charAt(0).toUpperCase() + id.slice(1).toLowerCase(),
      },
      this.getImagesData,
    )
  }

  onChangingSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickingSearchButton = () => {
    const {searchInput} = this.state
    this.setState(
      {
        activeState:
          searchInput.charAt(0).toUpperCase() +
          searchInput.slice(1).toLowerCase(),
        activeTabId: '',
        searchInput: '',
      },
      this.getImagesData,
    )
  }

  checkPaginationValidator = () => {
    const {imagesData, currentIndex, dataSize} = this.state
    if (currentIndex > 0 && dataSize < imagesData.length) {
      this.setState({pageNavigateLeft: true, pageNavigateRight: true})
    } else if (currentIndex === 0 && dataSize < imagesData.length) {
      this.setState({pageNavigateLeft: false, pageNavigateRight: true})
    } else if (currentIndex > 0 && dataSize > imagesData.length) {
      this.setState(prevState => ({
        pageNavigateLeft: true,
        pageNavigateRight: false,
        currentIndex: prevState.currentIndex - 2,
        dataSize: prevState.dataSize - 2,
      }))
    }
  }

  onClickingNextButton = () => {
    this.setState(
      prevState => ({
        currentIndex: prevState.currentIndex + 2,
        dataSize: prevState.dataSize + 2,
      }),
      this.checkPaginationValidator,
    )
  }

  onClickingPrevButton = () => {
    this.setState(
      prevState => ({
        currentIndex: prevState.currentIndex - 2,
        dataSize: prevState.dataSize - 2,
      }),
      this.checkPaginationValidator,
    )
  }

  render() {
    const {
      imagesData,
      activeTabId,
      searchInput,
      activeState,
      isLoading,
      pageNavigateLeft,
      pageNavigateRight,
      currentIndex,
      dataSize,
    } = this.state
    const navigatedData = imagesData.slice(currentIndex, dataSize)
    return (
      <div className="app-container">
        <div className="content-container">
          <img
            src="https://media.licdn.com/dms/image/C560BAQGnZlUHAASEvw/company-logo_200_200/0/1669653906405?e=1697673600&v=beta&t=D0_aJFUJFuEbGSr1JLScYrh1tYbOUCKo-BL1lEZGYu8"
            alt="logo"
          />
          <div className="search-box-container">
            <input
              type="search"
              placeholder="Search by title"
              className="search-input"
              value={searchInput}
              onChange={this.onChangingSearchInput}
            />
            <button
              className="search-icon-container"
              onClick={this.onClickingSearchButton}
              type="button"
            >
              <FiSearch style={{color: 'darkblue'}} />
            </button>
          </div>
          <ul className="tab-list-container">
            {tabItemsList.map(tabItem => (
              <TabItem
                key={tabItem.id}
                tabItemDetails={tabItem}
                tabSelect={activeTabId === tabItem.id}
                tabId={tabItem.id}
                onChangingTabItem={this.onChangingTabItem}
              />
            ))}
          </ul>
          <div className="current-state-container">
            <h1 className="active-state">{activeState}</h1>
          </div>
          <hr className="hr-line" />
          {isLoading ? (
            <div className="shimmer-spinner-container">
              <div className="shimmer-spinner">{}</div>
            </div>
          ) : (
            <ImagesDisplayContainer imagesList={navigatedData} />
          )}
        </div>
        <div className="pagination-container">
          {pageNavigateLeft ? (
            <button
              type="button"
              className="active-btn"
              onClick={this.onClickingPrevButton}
            >
              Prev
            </button>
          ) : (
            <button type="button" className="static-btn">
              Prev
            </button>
          )}
          {pageNavigateRight ? (
            <button
              type="button"
              className="active-btn"
              onClick={this.onClickingNextButton}
            >
              Next
            </button>
          ) : (
            <button type="button" className="static-btn">
              Next
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default App
