<script lang="ts">
  const apps = [
    'Prometheus Stack (Monitoring)',
    'Pepr (Policy Engine & Operator)',
    'Grafana (Monitoring)',
    'Loki (Log Aggregation)',
    'Istio (Service Mesh)',
    'Vector (Log Aggregation)',
    'Authservice (Authorization)',
    'Valero (Backup & Restore)',
    'Keycloak (IDAM)',
    'Metrics Server (Resource Metrics)',
    'Neuvector (Container Security)',
    'Tempo (Coming Soon!)',
    'Zarf (Airgap Deploy & SBOM)',
    'Kiali (Coming Soon!)'
  ];
</script>

<div id="uds-apps" class="grid grid-cols-2 gap-3.5">
  {#each apps as app}
    <div class="flex items-center gap-2.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
      >
        <g clip-path="url(#clip0_6515_13150)">
          <path
            d="M7.5 0C6.11553 0 4.76215 0.410543 3.61101 1.17971C2.45987 1.94888 1.56266 3.04213 1.03285 4.32121C0.503033 5.6003 0.36441 7.00776 0.634506 8.36563C0.904603 9.7235 1.57129 10.9708 2.55026 11.9497C3.52922 12.9287 4.7765 13.5954 6.13437 13.8655C7.49224 14.1356 8.8997 13.997 10.1788 13.4672C11.4579 12.9373 12.5511 12.0401 13.3203 10.889C14.0895 9.73784 14.5 8.38447 14.5 7C14.498 5.14411 13.7598 3.36482 12.4475 2.0525C11.1352 0.74019 9.35589 0.00203812 7.5 0ZM10.0949 6.0949L7.2949 8.8949C7.16363 9.02613 6.98562 9.09985 6.8 9.09985C6.61439 9.09985 6.43637 9.02613 6.3051 8.8949L4.9051 7.4949C4.77759 7.36288 4.70704 7.18606 4.70863 7.00252C4.71023 6.81898 4.78384 6.64341 4.91363 6.51363C5.04342 6.38384 5.21898 6.31022 5.40252 6.30863C5.58606 6.30703 5.76288 6.37759 5.8949 6.5051L6.8 7.4102L9.1051 5.1051C9.23712 4.97759 9.41394 4.90703 9.59748 4.90863C9.78102 4.91022 9.95659 4.98384 10.0864 5.11363C10.2162 5.24341 10.2898 5.41898 10.2914 5.60252C10.293 5.78606 10.2224 5.96288 10.0949 6.0949Z"
            fill="#31C48D"
          />
        </g>
        <defs>
          <clipPath id="clip0_6515_13150">
            <rect width="14" height="14" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
      <div class="text-gray-400">{app}</div>
    </div>
  {/each}
</div>
