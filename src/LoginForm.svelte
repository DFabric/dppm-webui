<script type="application/javascript">
  import { Form, Input } from "sveltejs-forms";
  import { login, redirect } from "./lib/api";
  import * as yup from "yup";
  import { Session } from "svelte-session-manager";
  const handleSubmit = async ({detail: { values: { user, auth }, setSubmitting }}) => {
      setSubmitting(false)
      login(session, { user, auth }).then(
        redirect('/')
      )
    }
  const schema = yup.object().shape({
    name: yup.string().required().min(3),
    auth: yup.string().required().min(10)
  });
</script>

<div class="modal is-active">
  <div class="modal-background" />
  <div class="modal-content columns">
    <div class="column is-2">
      <Form {schema} on:submit={handleSubmit} let:isSubmitting >
        <Input name="name" placeholder="Username" />
        <Input name="auth" placeholder="API Key" />
        <button type="submit" disabled={isSubmitting}>Sign in</button>
      </Form>
    </div>
  </div>
</div>
