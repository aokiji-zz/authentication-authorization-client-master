import { useEffect, useState } from 'react'
import { Card, Button, Col, Form, InputGroup } from 'react-bootstrap'
import './Calculator.css'
import * as yup from 'yup'
import { Formik } from 'formik'
import {  useAdditionMutation, useDivisionMutation, useMultiplicationMutation, useSubtractionMutation } from '../../services/calculator.service'
import { ICalculator } from '../../interfaces/calculator.interface'
const schema = yup.object().shape({
  paramA: yup.string().required(),
  paramB: yup.string().required(),
})
const CalculatorPage = () => {
  const [calculator, setCalculator] = useState<ICalculator>({ 
      paramA: 0,
      paramB: 0, 
      result: 0,
      operation:'addition'
     })
  const [getDivision, { data: dataDivision }] = useDivisionMutation()
  const [getMultiplication, { data: dataMultiplication }] = useMultiplicationMutation()
  const [getAddition, { data: dataAddition }] = useAdditionMutation()
  const [getSubtraction, { data: dataSubtraction }] = useSubtractionMutation()

  useEffect(() => {
    if (calculator.operation === 'division' && dataDivision) {
      setCalculator(dataDivision)
    }
    if (calculator.operation === 'multiplication' && dataMultiplication) {
      setCalculator(dataMultiplication)
    }
    if (calculator.operation === 'addition' && dataAddition) {
      setCalculator(dataAddition)
    }
    if (calculator.operation === 'subtraction' && dataSubtraction) {
      setCalculator(dataSubtraction)
    }
  }, [dataDivision, dataMultiplication, dataAddition, dataSubtraction])

  const handleDivision = (formValue: { paramA: string, paramB:string, operation:string }) => {
    const { paramA, paramB, operation } = formValue
    if(operation==='division'){
      getDivision({ paramA:parseInt(paramA, 10)||0, paramB:parseInt(paramB, 10)||0, })
      setCalculator({...dataDivision, operation})
    }
    if(operation==='multiplication'){
      getMultiplication({ paramA:parseInt(paramA, 10)||0, paramB:parseInt(paramB, 10)||0, })
      setCalculator({...dataMultiplication, operation})
    }
    if(operation==='addition'){
      getAddition({ paramA:parseInt(paramA, 10)||0, paramB:parseInt(paramB, 10)||0, })
      setCalculator({...dataAddition, operation})
    }
    if(operation==='subtraction'){
      getSubtraction({ paramA:parseInt(paramA, 10)||0, paramB:parseInt(paramB, 10)||0, })
      setCalculator({...dataSubtraction, operation})
    }
  }

  console.log("articles", calculator)

  return (
    <>
      <div className="login-wrapper">
      <Formik
        validationSchema={schema}
        onSubmit={handleDivision}
        initialValues={{
          //@ts-ignore
          paramA: 0,
          //@ts-ignore
          paramB: 0,

          operation:'addition'
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
          <Card className="card" style={{ width: '18rem' }}>
            <Card.Title className="title">Calculator</Card.Title>
            <Form className="form" noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="validationFormikEmail">
                {/* <Form.Label>Param A</Form.Label> */}
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">A</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Param A"
                    aria-describedby="inputGroupPrepend"
                    name="paramA"
                    value={values.paramA}
                    onChange={handleChange}
                    isInvalid={!!errors.paramA}
                  />
                  <Form.Control.Feedback type="invalid">{errors.paramA}</Form.Control.Feedback>
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">B</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Param B"
                    aria-describedby="inputGroupPrepend"
                    name="paramB"
                    value={values.paramB}
                    onChange={handleChange}
                    isInvalid={!!errors.paramB}
                  />
                  <Form.Control.Feedback type="invalid">{errors.paramB}</Form.Control.Feedback>
                </InputGroup>
                {/* select */}
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">?</InputGroup.Text>
                  <Form.Select
                  onChange={handleChange}
                  name="operation"
                  value={values.operation}
                  >
                    <option value="addition">Addition</option>
                    <option value="division">Division</option>
                    <option value="multiplication">Multiplication</option>
                    <option value="subtraction">Subtraction</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              {<h1>{calculator?.result}</h1>}
              <Button type="submit">Submit form</Button>
            </Form>
          </Card>
        )}
      </Formik>
    </div>
    </>
  )
}
export default CalculatorPage
