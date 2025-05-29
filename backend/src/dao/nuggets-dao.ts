import * as dotenv from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Nugget } from '../types';

dotenv.config();
export class NuggetsDao {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    ) as SupabaseClient;
  }
  getPaginatedNuggets = async ({
    startIndex,
    endIndex,
    limit,
  }: {
    startIndex: number;
    endIndex: number;
    limit: number;
  }) => {
    const { data, error, count } = await this.supabase
      .from('nuggets')
      .select('*', { count: 'exact' })
      .range(startIndex, endIndex)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) {
      throw new Error(`Error fetching nuggets from database: ${error.message}`);
    }
    return { data, count };
  };
  getNuggetById = async (id: string) => {
    const { data, error } = await this.supabase
      .from('nuggets')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) {
      throw new Error(
        `Error fetching nugget by id from database: ${error.message}`
      );
    }
    return data;
  };
  insertNugget = async (nugget: Nugget) => {
    const { data, error } = await this.supabase.from('nuggets').insert(nugget);
    if (error) {
      throw new Error(`Error inserting nugget into database: ${error.message}`);
    }
    return data;
  };
  updateNugget = async (id: string, nugget: Nugget) => {
    const { data, error } = await this.supabase
      .from('nuggets')
      .update(nugget)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      throw new Error(`Error updating nugget in database: ${error.message}`);
    }
    return data;
  };
  deleteNugget = async (id: string) => {
    const {  error } = await this.supabase
      .from('nuggets')
      .delete()
      .eq('id', id);
    if (error) {
      throw new Error(`Error deleting nugget from database: ${error.message}`);
    }
    return true;
  };
}
