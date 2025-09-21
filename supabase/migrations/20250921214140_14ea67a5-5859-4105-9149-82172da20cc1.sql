-- Fix security vulnerability: Restrict access to contacts table
-- Remove the overly permissive SELECT policy that allows anyone to read contact data
DROP POLICY "Allow reading contacts" ON public.contacts;

-- Create a more secure policy that only allows system/admin access
-- For now, we'll disable public SELECT access entirely since this is a contact form
-- Only the system (via service role) should access this data
CREATE POLICY "Restrict contact reading to system only" 
ON public.contacts 
FOR SELECT 
USING (false);  -- No public reading allowed

-- Keep the INSERT policy as is since users need to submit contact forms
-- The INSERT policy remains: "Allow public to insert contacts"