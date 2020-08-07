from views import (
    UserView,
    ContactView,
    LoginView,
    AuctionView,
    NewAuctionView,
    AuctionDetailView,
    AccountView,
    OfferView,
    FiltersView,
    SearchView,
    OfferUserView,
    OfferFinished,
)


# list with each access point in dict format
urls = [
    {
        'resource': UserView,
        'path': '/mi_perfil',
        'endpoint': 'mi_perfil',
    },
    {
        'resource': AccountView,
        'path': '/register',
        'endpoint': 'register',
    },
    {
        'resource': ContactView,
        'path': '/contact',
        'endpoint': 'contact',
    },
    {
        'resource': LoginView,
        'path': '/login',
        'endpoint': 'login',
    },
    {
        'resource': NewAuctionView,
        'path': '/newauction',
        'endpoint': 'newauction',
    },
    {
        'resource': AuctionView,
        'path': '/auction',
        'endpoint': 'auction',
    },
    {
        'resource': AuctionDetailView,
        'path': '/detail/<int:auction_id>',
        'endpoint': 'auction_detail',
    },
    {
        'resource': OfferView,
        'path': '/offer/detail/<int:auction_id>',
        'endpoint': 'offer',
    },
    {
        'resource': FiltersView,
        'path': '/filters',
        'endpoint': 'filters',
    },
    {
        'resource': SearchView,
        'path': '/search',
        'endpoint': 'search',
    },
    {
        'resource': OfferUserView,
        'path': '/offer/user',
        'endpoint': 'offer_user',
    },
    {
        'resource': OfferFinished,
        'path': '/offer_finished',
        'endpoint': 'offer_finished',
    },
]
