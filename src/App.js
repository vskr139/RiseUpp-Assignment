import {Component} from 'react'

import {FiSearch} from 'react-icons/fi'

import './App.css'

class App extends Component {
  state = {imagesData: []}

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

  render() {
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
            <FiSearch />
          </div>
        </div>
      </div>
    )
  }
}

export default App
