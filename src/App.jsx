import Layout from './components/Layout'
import SearchBar from './components/SearchBar'
import NotificationButton from './components/buttons/NotificationButton'
import CardContainer from './components/cardContainer/CardContainer'
import ItemCard from './components/itemCard/ItemCard'

const categories = ["Mockups"];

import './styles/App.css'
function App() {

  return (
    <>
      <Layout>
        <div className='flex'>
        <SearchBar categoryList={categories}/>
        <NotificationButton/> 
        </div>
        <CardContainer>
        {Array.from({ length: 30 }).map((_, index) => (
          <ItemCard key={index} />
        ))}
      </CardContainer>
    </Layout>
   
      
    </>
  )
}

export default App
