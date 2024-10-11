FROM cgr.dev/chainguard/node:latest-dev AS ui

COPY ui/package.json .
COPY ui/pnpm-lock.yaml .

RUN npx pnpm i

COPY schemas/ /schemas
COPY --chown=65532:65532 ui/ .

RUN npm run schema && npm run build

FROM cgr.dev/chainguard/wolfi-base:latest AS data

WORKDIR /work

RUN apk add bash oras yq

COPY hack/ ./hack
COPY apps/ ./apps

RUN ./hack/gen-data.sh

FROM cgr.dev/chainguard/go:latest-dev AS server

WORKDIR /app

COPY --from=ui /app/build ./ui/build
COPY --from=data /work/ui/static/api ./ui/build/ui/static/api

COPY go.mod .
COPY go.sum .
COPY pkg/ ./pkg
COPY main.go .

RUN CGO_ENABLED=0 go build -o ./build/uds-appstore .

FROM cgr.dev/chainguard/static:latest

ENV PORT=8080

# copy binary from local and expose port
COPY --from=server /app/build/uds-appstore /bin/uds-appstore

# run binary
CMD ["uds-appstore"]
