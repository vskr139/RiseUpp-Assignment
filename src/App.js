import {Component} from 'react'

import {FiSearch} from 'react-icons/fi'

import TabItem from './components/TabItem'

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
  state = {imagesData: [], activeTabId: ''}

  componentDidMount() {
    this.getImagesData()
  }

  getImagesData = async () => {
    const apiUrl =
      'https://api.unsplash.com/search/collections/?query=Beaches&client_id=gHnKY0t9jaQdZ1SOJHlP5X58hiEGCfSo47zAo229sCU'

    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const jsonData = await response.json()
    console.log(jsonData)
  }

  onChangingTabItem = id => {
    this.setState({activeTabId: id})
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div className="app-container">
        <img
          src="https://media.licdn.com/dms/image/C560BAQGnZlUHAASEvw/company-logo_200_200/0/1669653906405?e=1697673600&v=beta&t=D0_aJFUJFuEbGSr1JLScYrh1tYbOUCKo-BL1lEZGYu8"
          alt="logo"
        />
        <div className="search-box-container">
          <input
            type="search"
            placeholder="Search by title"
            className="search-input"
          />
          <div className="search-icon-container">
            <FiSearch style={{color: 'darkblue'}} />
          </div>
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
      </div>
    )
  }
}

export default App
