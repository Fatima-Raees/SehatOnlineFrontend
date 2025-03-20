// import React from 'react'
// import Header from '@/components/ui/Choose-Header'
// import Body from '@/components/ui/Choose-Body'


// export default function Choose() {
//   return (
//     <div className='w-[100vw] my-[5rem] mx-[2rem]'>
//       <Header />
//       <Body />
//     </div>
//   )
// }

import React from "react";
import Header from "@/components/ui/Choose-Header";
import Body from "@/components/ui/Choose-Body";

export default function Choose() {
  return (
    <section className="w-full my-20 px-6 lg:px-16">
      <Header />
      <Body />
    </section>
  );
}
