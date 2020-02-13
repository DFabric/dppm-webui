<script type="application/javascript">
  import { Form, Input } from "sveltejs-forms";
  import { post } from "./lib/api";
  import * as yup from "yup";
  const handleSubmit = ({detail: { values, setSubmitting }}) => {
      setSubmitting(false)
      post("/sign_in", values)
    }
  const schema = yup.object().shape({
    username: yup.string().required().min(3),
    password: yup.string().required().min(4)
  });
</script>

<div class="modal is-active">
  <div class="modal-background" />
  <div class="modal-content columns">
    <div class="column is-2">
      <Form {schema} on:submit={handleSubmit} let:isSubmitting >
        <Input name="username" placeholder="Username" />
        <Input name="password" placeholder="Password" />
        <button type="submit" disabled={isSubmitting}>Sign in</button>
      </Form>
    </div>
  </div>
</div>
