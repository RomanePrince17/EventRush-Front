
import HomePage from '../pages/Home.vue';
import LoginPage from '../pages/Login.vue';
import RegisterPage from '../pages/Register.vue';
import ticketPage from '../pages/ticket.vue';
import ContactPage from '../pages/Contact.vue';
import RecompensePage from '../pages/Recompense.vue';
import ProfilPage from '../pages/Profil.vue';
import MyTickets from '../pages/MyTickets.vue';
import billetsOrg from '../pages/billets_org.vue';
import AidePage from '../pages/Aide.vue';
import SettingPage from '../pages/Setting.vue';
import ListEvents from '../pages/ListTickets.vue';
import OrganisateursPage from '../pages/Organisateurs.vue';
import add_events from '../pages/add_events.vue';
import list_events from '../pages/events_list.vue';
import EventsList from '../pages/recup_api.vue';
import add_tickets from '../pages/add_tickets.vue';
import list_tickets from '../pages/tickets_list.vue';
import ResponsivitePage from '../pages/Responsivite.vue';
import NotificationPage from '../pages/notification.vue';
import HistoriquePage from '../pages/historique.vue';
import ProfilOrganisateur from '../pages/profil_organisateur.vue';
import EventsDetails from '../pages/events_details.vue'; 
import ConfirmOtp from '../pages/confirm_otp.vue';
import PaiementPage from '../pages/paiement.vue';
import PaiementSucces from '../pages/paiement_succes.vue';
import DashboardPage from '../pages/dashboard_admin.vue';
import Administrateur from '../pages/administrateur.vue';
import UsersList from '../pages/utilisateurs.vue';
import SouscriptionsList from '../pages/souscriptions.vue';
import SouscritsList from '../pages/souscrits.vue';
import EventShow from '../pages/event_show.vue';
import TicketShow from '../pages/ticket_show.vue';
import EventModif from '../pages/modif_event.vue';
import TicketModif from '../pages/modif_tickets.vue';
import Scannage from '../pages/scannage.vue';
import GoogleSuccess from '../pages/GoogleSuccess.vue';
import UserSouscription from '../pages/souscription_user.vue';
import ProfilAdministrateur from '../pages/profil_admin.vue';
import { createWebHistory, createRouter } from 'vue-router' 
import ScanEvent from '../pages/scan-event.vue';
import TableauBordOrganisateur from '../pages/tableau_board_org.vue';
import Scanneurs from '../pages/scanneurs.vue';




const 
routes = [
  { 
    name:'Scannage',
    path: '/scannage', 
    component: Scannage
   },
   { 
    name:'HomePage',
    path: '/', 
    component: HomePage
   },
   { 
    name:'LoginPage',
    path: '/login', 
    component: LoginPage
   },
   { 
    name:'RegisterPage',
    path: '/Register', 
    component: RegisterPage
   },
   { 
    name:'TicketPage',
    path: '/evenement', 
    component: ticketPage
   },
   { 
    name:'ContactPage',
    path: '/Contact', 
    component: ContactPage
   },
   { 
    name:'DashboardPage',
    path: '/dashboard', 
    component: DashboardPage
   },
   { 
    name:'RecompensePage',
    path: '/Recompense', 
    component: RecompensePage
   },
   { 
    name:'ProfilPage',
    path: '/Profil', 
    component: ProfilPage
   },
   { 
    name:'MyTickets',
    path: '/MyTickets', 
    component: MyTickets
   },
   { 
    name:'billetsOrg',
    path: '/billets_org', 
    component: billetsOrg
   },
   { 
    name:'AidePage',
    path: '/AidePage', 
    component: AidePage
   },
   { 
    name:'SettingPage',
    path: '/Setting', 
    component: SettingPage
   },
   { 
    path: '/evenement/:id',
    name: 'EventsDetails',
    component: EventsDetails,
    props: true //  passer l'id en prop
  
 },
   { 
    name:EventShow,
    path: '/event_show/:id',
    component:EventShow,
    props: true //  passer l'id en prop
   },           
   { 
    name:TicketShow,
    path: '/ticket_show/:id',
    component:TicketShow,
    props: true //  passer l'id en prop
   },
   { 
    name:EventModif,
    path: '/event_modif/:id',
    component:EventModif,
    props: true // passer l'id en prop 
   },
   { 
    name:UserSouscription,
    path: '/ma_souscription',
    component:UserSouscription,
   },
   { 
    name:TicketModif,
    path: '/ticket_modif/:id',
    component:TicketModif,
    props: true // passer l'id en prop
   },
   { 
    name:'ListEvents',
    path: '/ListEvents', 
    component: ListEvents
   },
   { 
    name:'Organisateurs',
    path: '/Organisateurs', 
    component: OrganisateursPage
   },
   { 
    name:'Responsivite',
    path: '/Responsivite', 
    component: ResponsivitePage 
   },
   { 
    name:'add_events',
    path: '/add_events', 
    component: add_events
   },
   { 
    name:'list_events',
    path: '/list_events', 
    component: list_events
   },
   {
    name: 'GoogleSuccess',
    path: '/google-success',
    component:GoogleSuccess
  }
  ,
  { 
   name:'add_tickets',
   path: '/add_tickets', 
   component: add_tickets
  },
  { 
    name:'list_tickets',
    path: '/list_tickets', 
    component: list_tickets
   },
   { 
    name:'NotificationPage',
    path: '/notification', 
    component: NotificationPage
   },
   { 
    name:'HistoriquePage',
    path: '/historique', 
    component: HistoriquePage
   },
   { 
    name:'ProfilOrganisateur',
    path: '/Profil_organisateur', 
    component:ProfilOrganisateur
   },
   { 
    name:'EventsList',
    path: '/EventsList', 
    component: EventsList
   },
   { 
    name:'ConfirmOtp',
    path: '/Confirm_otp', 
    component: ConfirmOtp
   },
   { 
      path: '/evenement/:id',
      name: 'EventsDetails',
      component: EventsDetails,
      props: true // permet de passer l'id en prop
    
   },
   { 
    name:'PaiementPage',
    path: '/paiement', 
    component: PaiementPage
   },
   {
    path: '/paiement/succes',
    name: 'PaiementSucces',
    component: PaiementSucces
  },
  {
    path: '/scan_event',
    name: 'ScanEvent',
    component: ScanEvent
  },
   { 
    name:'Administrateur',
    path: '/administrateur', 
    component: Administrateur
   },
   { 
    name:'SouscritptionsList',
    path: '/souscriptions', 
    component: SouscriptionsList
   },
   { 
    name:'SouscritsList',
    path: '/souscrits', 
    component: SouscritsList
   },
   { 
    name:'UsersList',
    path: '/users', 
    component: UsersList
   },
   { 
    name:'ProfilAdministrateur',
    path: '/Profil_admin', 
    component:ProfilAdministrateur
   },
   { 
    name:'TableauBordOrganisateur',
    path: '/tableau_org', 
    component:TableauBordOrganisateur
   },
   { 
    name:'Scanneurs',
    path: '/scanneur', 
    component:Scanneurs
   },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router