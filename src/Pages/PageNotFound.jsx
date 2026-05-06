import { Link } from 'react-router'
import img3 from '../assets/1pagenotfond.jpg'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <img 
                src={img3}  // ✅ তোমার image path দাও
                alt="404" 
                className="w-80 mb-6"
            />
            <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
            <Link to="/" className="btn btn-primary">
                Go Home
            </Link>
        </div>
    )
}

export default NotFound