FROM cgr.dev/chainguard/node:latest-dev AS ui

COPY ui/package.json .
COPY ui/pnpm-lock.yaml .

RUN npx pnpm i

COPY schemas/ /schemas
COPY --chown=65532:65532 ui/ .

RUN npm run build

FROM cgr.dev/chainguard/go:latest-dev AS server

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY pkg/ ./pkg
COPY main.go .

RUN CGO_ENABLED=1 GOOS=linux go build -o ./build/uds-appstore .

FROM cgr.dev/du-uds-defenseunicorns/glibc:latest-dev

ENV PORT=:8080
ENV UI_ASSETS_DIR=/assets
ENV SEC_HUB_DB_DIR=/var/data/db

# copy binary from local and expose port
COPY --from=ui /app/build ${UI_ASSETS_DIR}
COPY ./build/uds-appstore /bin/uds-appstore
# COPY --from=server /app/build/uds-appstore /bin/uds-appstore
COPY ./db/uds-security-hub.db ${SEC_HUB_DB_DIR}/

# run binary
CMD ["uds-appstore"]
