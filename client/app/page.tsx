// `app/page.tsx` is the UI for the `/` URL
//this is the main page of WikiPizza, it will hold information about this website and the best recipes, and latest posts at least 4 newest
// a cute drawing of pizza, and random pizza recipe of the day ?
import Image from 'next/image';
export default function Page() {
  return (

    <>
     <div className="img-fluid">
      <Image src="/images/Pizza.png" className="rounded mx-auto d-block" alt="main page image" width={200} height={200}/>
     </div>
  <h1>Welcome to WikiPizza</h1>
    </>
  )
}
 
    