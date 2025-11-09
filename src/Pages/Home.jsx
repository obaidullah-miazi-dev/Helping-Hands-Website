
import Banner from '../components/Banner';
import CompletedEvent from '../components/CompletedEvent';


const Home = () => {
    

    // axios.get('/events')
    // .then(data => setEvents(data.data))
    // .catch(error=>{
    //     setError(error)
    // })
    // .finally(setLoading(false))




    

    return (
        <div>
            <Banner></Banner>
            <CompletedEvent></CompletedEvent>
            
        </div>
    );
};

export default Home;