// import React, { useState, useEffect } from 'react'
// import { Typography, Button, Stack, Card, Avatar, dividerClasses, Grid, Drawer, } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import Cards from '../Components/Cards';
// import BigCard from '../Components/Big-card';
// import axios from 'axios';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import LocationBox from '../Components/LocationBox'

// const useStyles = makeStyles({
//   heading: {
//     fontSize: "32px",
//     fontWeight: "600"
//   },
//   Buttons:
//   {
//     width: "157px",
//     height: "51px",
//     backgroundColor: "white",
//   }

// })

// export default function Explore() {
//   const classes = useStyles()
//   const [postData, setPostData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the JSON endpoint using Axios
//     axios.get('http://localhost:3004/posts')
//       .then(response => {
//         setPostData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // Empty dependency array to ensure the effect runs only once

//   return (
//     <div>
//       <Grid container sx={{
//         padding: "2rem",
//         gap: "2rem",
//         alignItems: 'center',
//         justifyContent: 'space-between',

//       }}>
//         <Grid item xl={5} lg={5} md={4} className={classes.heading} style={{ color: '#F9F9F9' }}>Explore</Grid>
//         <Grid item xl={5} lg={5} md={4} >
//           <LocationBox />
//         </Grid>
//       </Grid>
//       <Grid
//         container
//         direction="colomn"
//         sx={{
//           gap: '2rem',
//           alignItems: 'center', // Center vertically
//           justifyContent: 'center',
//           padding: "1rem",
//         }}
//       >

//         {postData.map(post => (
//           <div key={post.id}>
//             {post.type === "l" ? (
//               <Grid item xl={12} lg={12} md={12}>
//                 <BigCard
//                   date={post.date}
//                   headline={post.header}
//                   authorName="Alia Bhat"
//                   content={post.content}
//                 />
//               </Grid>
//             ) : (

//               <Grid item xl={4} lg={4} md={4} sm={12}>
//                 <Cards
//                   date={post.date}
//                   headline={post.header}
//                   authorName="Alia Bhat"
//                   info={post.content}
//                 />
//               </Grid>

//             )}
//           </div>
//         ))}
//       </Grid>
//     </div>

//   )
// }

import React, { useState, useEffect } from 'react';
import { Typography, Button, Stack, Card, Avatar, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cards from '../Components/Cards';
import BigCard from '../Components/Big-card';
import axios from 'axios';

export default function Explore() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON endpoint using Axios
    axios
      .get('http://localhost:3004/posts')
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once

  // Function to group 's' posts into rows of 3
  const groupSPostsIntoRows = () => {
    const sPosts = postData.filter((post) => post.type === 's');
    const rows = [];
    for (let i = 0; i < sPosts.length; i += 3) {
      const row = sPosts.slice(i, i + 3);
      while (row.length < 3) {
        row.push(null); // Fill with null for empty columns
      }
      rows.push(row);
    }
    return rows;
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Explore</h1>
      <Grid
        container
        direction="row"
        sx={{
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {postData.map((post) => (
          <div key={post.id}>
            {post.type === 'l' ? (
              <Grid item xl={12} lg={12} md={12}>
                <BigCard
                  date={post.date}
                  headline={post.header}
                  authorName="Alia Bhat"
                  content={post.content}
                />
              </Grid>
            ) : null /* Don't render 's' type posts here */}
          </div>
        ))}
        {groupSPostsIntoRows().map((row, rowIndex) => (
          <Grid container key={rowIndex} sx={{ marginBottom: '0rem' }}>
            {row.map((sPost, columnIndex) => (
              <Grid item key={columnIndex} xl={4} lg={4} md={4} sm={12}>
                {sPost ? (
                  <Cards
                    date={sPost.date}
                    headline={sPost.header}
                    authorName="Alia Bhat"
                    info={sPost.content}
                  />
                ) : null /* Render an empty column for null values */}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
