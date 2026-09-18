import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import * as z from 'zod'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldLabel } from '../ui/field'
import { Button } from '../ui/button'
const formschema = z.object({
    name: z.string().min(3, "Must be atleast three characters"),
    amount: z.coerce.number().min(1, "Must be atleast one digit")
})

const ExpenseForm = () => {
const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        amount: ""
     }
})

const onSubmit = async (data) =>{
    console.log(data);
}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
            <CardHeader className={'border-b'}>
                <CardTitle>Add expense</CardTitle>
                <CardDescription>Enter name and amount of expense</CardDescription>
            </CardHeader>
            <CardContent>
                 <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Enter expense name</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    placeholder="ticket"
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="amount"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Enter expense amount</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="number"
                                    placeholder="100"
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <CardFooter>
                        <Button Type="submit">Submit</Button>
                    </CardFooter>
            </CardContent>
        </Card>
    </form>
  )
}

export default ExpenseForm
