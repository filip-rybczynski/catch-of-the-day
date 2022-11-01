export {};
// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { Button } from '@mui/material';
// import { useEffect, useState } from 'react';

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//     const [selectedStoreName, setSelectedStoreName] = useState("");

//     const [storeName, setStoreName] = useState(getFunName());
//     const [existingStores, setExistingStores] = useState<string[]>();
//     const [restrictedInput, setRestrictedInput] = useState("");
  
//     const dataBaseRef = appDB.ref();
  
//     const capitalize = (storeName: string) => {
//       return storeName
//         .split("-")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     };
  
//     useEffect(() => {
//       (async () => {
//         const stores = (await dataBaseRef.get()).val();
//         const storeNames = Object.keys(stores);
  
//         setExistingStores(storeNames);
//       })();
//     }, []);
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       e.preventDefault();
  
//       const newValue = e.currentTarget.value;
  
//       const words = newValue.split(" ");
//       console.log(words);
  
//       if (words.length > 3) {
//         alert("too long! Max 3 words");
//         setRestrictedInput(words.slice(0, 3).join(" "));
//         return;
//       }
  
//       setRestrictedInput(newValue);
//     };
  
//     const goToStore = (e: React.SyntheticEvent) => {
//       e.preventDefault();
  
//       props.history.push(`/store/${selectedStoreName}`);
//     };

//     // *****
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box component="form" sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <TabPanel value={value} index={0}>
//       <label htmlFor="existing">Choose existing</label>
//       <select>
//         <option value="">--Select--</option>
//         {existingStores?.map((store) => (
//           <option key={store} value={store}>
//             {capitalize(store)}
//           </option>
//         ))}
//       </select>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//       <Button type="submit">
//         Let's go!
//       </Button>
//     </Box>
//   );
// }
