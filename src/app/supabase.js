
export const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkc2Vqc3lyZWNyZmZuanFldmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4NTcxOTcsImV4cCI6MjAwNDQzMzE5N30.lQp4_X1_JxGAS3SlmFHgHs8TQs30F35ssfS-0oZOw-k";
export const API_KEY_CLOUDCRAFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYndweXJybGtqdHBvaHN6cmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMjI4NzQsImV4cCI6MjA1Nzg5ODg3NH0.gdePSQMQweGXneKFnLq6V3gU1UuilCvIwIIIBwZ-yBI";
export const API_KEY_WECARE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjZ3ZrYmNvZHVzaGh5YW9kb3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczODg4NDYsImV4cCI6MjA2Mjk2NDg0Nn0.YL0Ba4TbNG3A-IZ7Llv1Q6j8iEONyDsEr_ecvnJSeNk"
export const SUPABASE_URL_WECARE = "https://vcgvkbcodushhyaodown.supabase.co"
export const SUPABASE_URL = "https://sdsejsyrecrffnjqevfm.supabase.co";
export const SUPABASE_URL_CLOUDCRAFT = "https://dabwpyrrlkjtpohszrhr.supabase.co"
export const NEXT_PUBLIC_GOOGLE_API_KEY = "AIzaSyDFqp0PGp-vOy_BLx-ljnGZcUks9VbJgXM"


export const MainMenuList = [
  {
    "name": 'Women', "path": "/products", "data": "",
    "menu":
      [{ "name": 'Clothing', "path": "/products" },
      { "name": 'Shoes', "path": "/products" },
      { "name": 'Accessories', "path": "/products" }]
  },
  {
    "name": 'Men', "path": '/products', "menu":
      [{ "name": "Clothing", "path": "/products" },
      { "name": "Smart", "path": "/products" },
      { "name": "Accessories", "path": "/products" },
      { "name": "Shoes", "path": "/products" }]
  },
  {
    "name": 'Kids', "path": '/products', "menu":
      [
        { "name": "Boys (2-15)", "path": "/products" },
        { "name": "Girls (2-15)", "path": "/products" },
        { "name": "Schoolware", "path": "/products" },
        { "name": "Toiletries & Food", "path": "/products" },
      ]
  },
  {
    "name": 'Baby', "path": '/products', "menu":
      [{ "name": "Girl & Boys clothing (0-36)", "path": "/products" },
      { "name": "Nursary", "path": "/products" },
      { "name": "Books & Toys", "path": "/products" },
      ]
  },
  {
    "name": 'New Arrivals', "path": '/products', "menu":
      [{ "name": "Recently Added productss", "path": "/products" },
      ]
  },
]

export const SubMenuList = [
  { "name": "Donate", "path": "/add_products" },
  { "name": 'Orders', "path": "/orders" },
  { "name": 'Account', "path": "/account" },
  { "name": 'Login / Sign Up', "path": "/login" },
]

export const AppName = "We care";
export const Address = "21 welgemoed street, welgemoed"
export const phone_number = "+27 61 417 0615"
export const email_address = "www.wecare@gmail.com"
export const instagram_account = ""
export const facebook_account = ""
export const whatsapp_account = ""

export const third_party_delivery_rate = 5.75 // R/km
export const our_delivery_rate = 4
export const delivery_rate = our_delivery_rate + third_party_delivery_rate; // R/km
export const max_delivery_cost = 350; // R
export const min_delivery_cost = 50;
export const max_distance_from_warehouse = 50; // in km if the the distance exceeds this ammount, same day delivery does not apply
export const min_distance_from_warehouse = 5; // personal delivery for distances less than this


export const TextColorHover = "#0A4D68"
export const TitleColor = "rgba(27, 51, 54, 0.75)"
export const DrawerBackgroundColor = "transparent"
export const DrawerBackgroundHoverColor = "rgba(0, 0, 0, 0.25)"
export const BackgroundColor = DrawerBackgroundColor
export const TextColor = "text-cyan-950"
export const IconButtonColor = "#b1fbfc"
export const TopBarColor = "bg-cyan-950"
export const FontType = "Poetsen One, serif"
export const NavigationBackgroundColor = "to-lime-400 from-cyan-500 via-pink-500"
export const NavigationTextSize = "sm";
export const LoaderColor = "rgba(181, 24, 100, 0.8)"
export const ProductBackgroundColor = "rgba(27, 51, 54, 0.8)"
