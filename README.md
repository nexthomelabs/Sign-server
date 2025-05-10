# Nexthomelabs Sign

A modern, secure platform for signing PDF documents with digital signatures.

## Features

- **Secure PDF E-Signing:** With robust encryption algorithms ensuring maximum security, privacy & compatibility
- **User-Friendly Interface:** Intuitive design for ease of use with features like "Sign yourself", "Templates", and "One click signatures"
- **Multi-signer Support:** Invite multiple signers and enforce signing in sequence
- **Email Verification:** OTP verification support for guest signers
- **Document Management:** Set expiration dates, handle rejections, and manage document lifecycle
- **Customizable Email Templates:** Personalize all document signing invitations and notifications
- **PDF Template Creation:** Create and store templates for repeated use
- **Nexthomelabs Drive:** A centralized secure vault for your digital documents
- **Audit Trails & Completion Certificate:** Detailed logs for tracking document activities
- **API Support:** Seamless integration into existing systems and software
- **Supabase Integration:** Built on Supabase for robust authentication and storage

## Getting Started

### Prerequisites

- Node.js (v18, v20, or v22)
- Docker and Docker Compose (for containerized deployment)

### Installation

The simplest way to install Nexthomelabs Sign on your own server is using our official docker images:

```bash
export HOST_URL=https://sign.yourdomain.com && \
curl --remote-name-all https://raw.githubusercontent.com/nexthomelabs/nexthomelabs-sign/main/docker-compose.yml https://raw.githubusercontent.com/nexthomelabs/nexthomelabs-sign/main/Caddyfile https://raw.githubusercontent.com/nexthomelabs/nexthomelabs-sign/main/.env.local_dev && \
mv .env.local_dev .env.prod && \
docker compose up --force-recreate
```

Make sure that you have `Docker` and `git` installed before you run this command.

## License

This project is licensed under the MIT License - see the LICENSE file for details.# sign-server
