# Exercice 05 - Ansible: Playbooks & Roles

## Structure du projet

```
infra/ansible/
├── docker-compose.yml          # Infrastructure de test (2 containers Ubuntu)
├── inventory.yml               # Inventaire avec webservers et appservers
├── inventory-localhost.yml     # Inventaire local pour tests
├── playbook-base.yml           # Playbook de configuration de base
├── playbook-nginx.yml          # Playbook pour Nginx
├── site.yml                    # Playbook principal avec tous les roles
└── roles/
    ├── base/                   # Role: configuration de base
    │   ├── tasks/main.yml
    │   └── defaults/main.yml
    ├── nginx/                  # Role: serveur web Nginx
    │   ├── tasks/main.yml
    │   ├── handlers/main.yml
    │   ├── templates/
    │   │   ├── default.conf.j2
    │   │   └── index.html.j2
    │   └── defaults/main.yml
    └── app/                    # Role: serveur application
        ├── tasks/main.yml
        └── defaults/main.yml
```

## Commandes essentielles

### 1. Démarrer l'infrastructure

```bash
cd infra/ansible
docker compose up -d
```

### 2. Vérifier la connexion Ansible

```bash
ansible all -i inventory.yml -m ping
```

### 3. Lister les tâches

```bash
ansible-playbook -i inventory.yml site.yml --list-tasks
```

### 4. Dry-run (preview sans exécution)

```bash
ansible-playbook -i inventory.yml playbook-base.yml --check
```

### 5. Exécuter le playbook de base

```bash
ansible-playbook -i inventory.yml playbook-base.yml
```

### 6. Exécuter le playbook Nginx

```bash
ansible-playbook -i inventory.yml playbook-nginx.yml
```

### 7. Exécuter tous les roles (site.yml)

```bash
ansible-playbook -i inventory.yml site.yml
```

### 8. Démontrer l'idempotence (2 runs)

```bash
# Première exécution
ansible-playbook -i inventory.yml site.yml
# → Changements effectués (changed=X)

# Deuxième exécution (sans changements)
ansible-playbook -i inventory.yml site.yml
# → Aucun changement (changed=0) = IDEMPOTENT ✓
```

### 9. Mode verbose (debug)

```bash
ansible-playbook -i inventory.yml playbook-base.yml -vvv
```

### 10. Limiter à un groupe

```bash
ansible-playbook -i inventory.yml site.yml --limit webservers
```

### 11. Limiter à un host

```bash
ansible-playbook -i inventory.yml site.yml --limit ansible-node1
```

### 12. Vérifier la syntaxe

```bash
ansible-playbook --syntax-check playbook-base.yml
```

### 13. Nettoyer

```bash
docker compose down
```

## Concepts clés démontrés

### ✅ Roles (Réutilisability)

- **base** : Packages de base, configuration commune
- **nginx** : Installation et configuration du serveur web
- **app** : Installation des dépendances applicatives

### ✅ Templates Jinja2 (Variables)

- `roles/nginx/templates/default.conf.j2` : Configuration dynamique
- Support des variables : `{{ nginx_port }}`, `{{ ansible_hostname }}`

### ✅ Handlers (Idempotence)

- `notify: restart nginx` déclenche le restart seulement si la config change
- Démontre le principe "déclaratif" d'Ansible

### ✅ Defaults et Variables

- `roles/base/defaults/main.yml` : Packages à installer
- `roles/nginx/defaults/main.yml` : Port nginx
- `roles/app/defaults/main.yml` : Configuration app

### ✅ Groupes et Inventaire

- `webservers` : ansible-node1 (Nginx)
- `appservers` : ansible-node2 (Node.js)

## Résultats attendus

### Première exécution

```
PLAY [Configuration commune] ...ok=2 changed=2 skipped=0 failed=0
PLAY [Serveurs web] ...ok=3 changed=3 skipped=0 failed=0
PLAY [Serveurs d'application] ...ok=1 changed=1 skipped=0 failed=0
```

### Deuxième exécution (Idempotence)

```
PLAY [Configuration commune] ...ok=2 changed=0 skipped=0 failed=0
PLAY [Serveurs web] ...ok=3 changed=0 skipped=0 failed=0
PLAY [Serveurs d'application] ...ok=1 changed=0 skipped=0 failed=0
```

→ `changed=0` = IDEMPOTENT ✓

## Livrable ✓

- [x] Inventaire avec 2 groupes de hosts (webservers, appservers)
- [x] Playbooks de base et nginx avec variables et handlers
- [x] 3 roles structurés (base, nginx, app)
- [x] Templates Jinja2 pour configuration dynamique
- [x] Démonstration de l'idempotence (2 runs identiques)
