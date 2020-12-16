// import React from 'react'
// import {Button, Grid} from '@material-ui/core'
// import { Autocomplete } from '@material-ui/lab'
// import { Formik, Form, Field } from 'formik'
// import { TextField } from 'formik-material-ui'
// import * as yup from 'yup'
// import {allUniversities} from "../../allUniversities";
// // import { nationality } from '../../constants/nationality'
// // import Button from '../Button/Button'
//
// export default function ForeignAddress () {
//
//     let localStorageData = localStorage.getItem('foreignAddress'),
//         retrivedData = JSON.parse(localStorageData)
//
//
//     const handleNextClick = () => {
//         console.log('clicked next')
//     }
//
//     const handleBackClick = () => {
//         console.log('clicked back')
//     }
//
//     const validationSchema = yup.object({
//         streetName: yup.string().required('Street name is required'),
//         streetNumber: yup.string().required('Street number is required'),
//         postalCode: yup.string().required('Postal code is required'),
//         city: yup.string().required('City is required'),
//         country: yup.string().required('Country is required'),
//     })
//
//     console.log(retrivedData)
//
//     return (
//         <React.Fragment>
//             <div className="pages-wrapper address">
//                 <Formik
//                     initialValues={retrivedData ? retrivedData : {streetName: '', streetNumber: '', postalCode: '', city: '', coAddress: '', country: ''}}
//                     onSubmit={(data) => {
//                         console.log(data)
//                         localStorage.setItem('foreignAddress', JSON.stringify(data))
//                         handleNextClick()
//                     }}
//                     validationSchema={validationSchema}
//                 >
//                     {({setFieldValue,values}) => (
//                         <Form>
//                             <Grid container spacing={3}>
//                                 <Grid item xs={12} md={8}>
//                                     <Field component={TextField} name="streetName" label="Street Name" variant="outlined" fullWidth />
//                                 </Grid>
//                                 <Grid item xs={12} md={4}>
//                                     <Field component={TextField} name="streetNumber" label="Street Number" variant="outlined" fullWidth />
//                                 </Grid>
//                                 <Grid item xs={12} md={4}>
//                                     <Field component={TextField} name="postalCode" label="Postal Code" variant="outlined" fullWidth />
//                                 </Grid>
//                                 <Grid item xs={12} md={8}>
//                                     <Field component={TextField} name="city" label="City" variant="outlined" fullWidth />
//                                 </Grid>
//                                 <Grid item xs={12} md={6}>
//                                     <Field component={TextField} name="coAddress" label="C/O Address" variant="outlined" fullWidth />
//                                 </Grid>
//                                 <Grid item xs={12} md={6}>
//                                     {/*<Autocomplete*/}
//                                     {/*    id="foreignCountry"*/}
//                                     {/*    className="country-select"*/}
//                                     {/*    name="country"*/}
//                                     {/*    options={nationality}*/}
//                                     {/*    getOptionLabel={option => option.label}*/}
//                                     {/*    onChange={(e, value) => {*/}
//                                     {/*        console.log(value)*/}
//                                     {/*        setFieldValue("country", value.code)*/}
//                                     {/*    }}*/}
//                                     {/*    renderInput={params => (*/}
//                                     {/*        <Field component={TextField} {...params} name="country" label="Country" variant="outlined" fullWidth/>*/}
//                                     {/*    )}*/}
//                                     {/*/>*/}
//                                     <Autocomplete
//                                         id="foreignCountry"
//                                         className="country-select"
//                                         name="country"
//                                         options={allUniversities}
//                                         getOptionLabel={option => option.name}
//                                         defaultValue={values.country}
//                                         onChange={(e, value) => {
//                                             console.log(value)
//                                             setFieldValue("country", value)
//                                         }}
//                                         renderInput={params => (
//                                             <Field component={TextField} {...params} name="country" label="Country" variant="outlined" fullWidth/>
//                                         )}
//                                     />
//                                 </Grid>
//                             </Grid>
//                             <div className="button-wrapper">
//                                 <Button label="Back" go="back" handleClick={handleBackClick}/>
//                                 <Button label="Next" go="next" type="submit" />
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </React.Fragment>
//     )
// }
