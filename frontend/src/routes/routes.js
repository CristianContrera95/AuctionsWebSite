import LoginForm from '../components/LoginFormComponent';
import Contact from '../components/ContactComponent';
import Detail from '../components/Detail'
import HomePage from "../components/HomePageComponent";
import RegisterForm from '../components/ToRegister';
import AddCards from "../components/AddCards";
import Profile from "../components/Profile";
import Faqs from "../components/Faqs";
import MiProfile from "../components/MiProfile";
import AcceptAuctions from "../components/AcceptAuctions";
import RecoverPassword from "../components/RecoverPassword";
import ChangePassword from "../components/ChangePassword";
import ValidateEmail from "../components/ValidateEmail";

const routes = [
    { path: '/login', name: 'Login', component: LoginForm },
    { path: '/home', name: 'Home', component: HomePage },
    { path: '/register', exact: true, name: 'Register', component: RegisterForm },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/detail', name: 'Detail', component: Detail },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/property', name: 'Property', component: HomePage },
    { path: '/automobile', name: 'Automobile', component: HomePage },
    { path: '/farm', name: 'Farm', component: HomePage },
    { path: '/new', name: 'New', component: AddCards },
    { path: '/faqs', name: 'Faqs', component: Faqs },
    { path: '/mi_perfil', name: 'MiProfile', component: MiProfile},
    { path: '/accept_auction', name: 'AcceptAuctions', component: AcceptAuctions},
    { path: '/recover_password', name: 'RecoverPassword', component: RecoverPassword},
    { path: '/change_password', name: 'ChangePassword', component: ChangePassword},
    { path: '/validate_email', name: 'ValidateEmail', component: ValidateEmail}
];

export default routes;
