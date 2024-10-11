<script lang="ts">
  import { Alert, Button } from '$lib/components';

  const message =
    "We're currently developing this section to provide you with a direct line of communication with our team. In the meantime, our mission experts are ready to assist you with any specific authorization documentation or information you need for this application deployed on UDS.";
</script>

<div class="flex w-full justify-center">
  <Alert color="info" title="Information Coming Soon!" class="mt-4 w-10/12" {message}>
    <div class="flex gap-2">
      <Button size="xs" color="alternative" href="https://www.defenseunicorns.com/contactus">
        Request More Information
      </Button>
    </div>
  </Alert>
</div>
