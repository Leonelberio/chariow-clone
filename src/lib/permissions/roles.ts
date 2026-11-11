import type { OrganizationRole } from "@prisma/client";

const roleRank: Record<OrganizationRole, number> = {
  OWNER: 4,
  ADMIN: 3,
  MANAGER: 2,
  STAFF: 1,
};

export const roleLabels: Record<OrganizationRole, string> = {
  OWNER: "Propriétaire",
  ADMIN: "Administrateur",
  MANAGER: "Manager",
  STAFF: "Staff",
};

export function hasMinRole(
  userRole: OrganizationRole,
  required: OrganizationRole,
): boolean {
  return roleRank[userRole] >= roleRank[required];
}

export function canManageOrganization(role: OrganizationRole): boolean {
  return hasMinRole(role, "ADMIN");
}

export function canManageCatalog(role: OrganizationRole): boolean {
  return hasMinRole(role, "MANAGER");
}

export function canManageOrders(role: OrganizationRole): boolean {
  return hasMinRole(role, "MANAGER");
}

export function canViewDashboard(role: OrganizationRole): boolean {
  return hasMinRole(role, "STAFF");
}
