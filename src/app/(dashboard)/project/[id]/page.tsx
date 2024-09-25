// 'use client'

// import Header from '@/src/components/containers/Header'
// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// const ProjectPage = () => {

//   const router = useRouter()
//   const { id } = router.query

//   const [project, setProject] = useState(null)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     if (id) {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(`/api/projects/${id}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           })

//           if (!response.ok) {
//             throw new Error('Failed to fetch project data')
//           }

//           const data = await response.json()
//           setProject(data)
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error:any) {
//           setError(error.message)
//         }
//       }

//       fetchData()
//     }
//   },[id])

//   return (
//     <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex flex-col">
//       <Header title={project.name}/>
//     </div>
//   )
// }

// export default ProjectPage