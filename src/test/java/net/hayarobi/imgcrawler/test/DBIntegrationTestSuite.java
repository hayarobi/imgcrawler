package net.hayarobi.imgcrawler.test;

import org.junit.experimental.categories.Categories;
import org.junit.experimental.categories.Categories.IncludeCategory;
import org.junit.runner.RunWith;

@RunWith(Categories.class)
@IncludeCategory(DBIntegTest.class)
public abstract class DBIntegrationTestSuite {

}
